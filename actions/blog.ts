'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function createPost(formData: FormData) {
    const supabase = await createClient()

    const title = formData.get('title') as string
    const slug = formData.get('slug') as string
    const content = formData.get('content') as string
    const published = formData.get('published') === 'on'

    const { error } = await supabase.from('posts').insert({
        title,
        slug,
        content,
        published,
        published_at: published ? new Date().toISOString() : null
    })

    if (error) {
        console.error('Error creating post:', error)
        if (error.code === '23505') {
            return { success: false, error: 'A post with this slug already exists. Please choose a different one.' }
        }
        return { success: false, error: 'Failed to create post' }
    }

    revalidatePath('/blog')
    revalidatePath('/admin/blog')
    return { success: true }
}

export async function updatePost(id: number, formData: FormData) {
    const supabase = await createClient()

    const title = formData.get('title') as string
    const slug = formData.get('slug') as string
    const content = formData.get('content') as string
    const published = formData.get('published') === 'on'

    const { error } = await supabase.from('posts').update({
        title,
        slug,
        content,
        published,
        published_at: published ? new Date().toISOString() : null
    }).eq('id', id)

    if (error) {
        console.error('Error updating post:', error)
        if (error.code === '23505') {
            return { success: false, error: 'A post with this slug already exists. Please choose a different one.' }
        }
        return { success: false, error: 'Failed to update post' }
    }

    revalidatePath('/blog')
    revalidatePath('/admin/blog')
    return { success: true }
}

export async function deletePost(id: number) {
    const supabase = await createClient()

    // First, get the post to extract image URLs
    const { data: post, error: fetchError } = await supabase
        .from('posts')
        .select('content')
        .eq('id', id)
        .single()

    if (fetchError) {
        console.error('Error fetching post:', fetchError)
        return { success: false, error: 'Failed to fetch post for deletion' }
    }

    // Extract image URLs from markdown content
    const imageUrls = extractImageUrls(post?.content || '')

    // Delete images from storage bucket
    if (imageUrls.length > 0) {
        for (const url of imageUrls) {
            try {
                // Extract the file path from the full URL
                // URL format: https://[project].supabase.co/storage/v1/object/public/blog-images/[filename]
                const pathMatch = url.match(/\/blog-images\/(.+)$/)
                if (pathMatch && pathMatch[1]) {
                    const filePath = pathMatch[1]
                    const { error: storageError } = await supabase.storage
                        .from('blog-images')
                        .remove([filePath])

                    if (storageError) {
                        console.warn(`Failed to delete image ${filePath}:`, storageError)
                        // Continue with other images even if one fails
                    }
                }
            } catch (err) {
                console.warn('Error processing image URL:', url, err)
            }
        }
    }

    // Delete the post from database
    const { error } = await supabase.from('posts').delete().eq('id', id)

    if (error) {
        console.error('Error deleting post:', error)
        return { success: false, error: 'Failed to delete post' }
    }

    revalidatePath('/blog')
    revalidatePath('/admin/blog')
    return { success: true }
}

// Helper function to extract image URLs from markdown
function extractImageUrls(content: string): string[] {
    const imageRegex = /!\[.*?\]\((https?:\/\/[^\)]+)\)/g
    const urls: string[] = []
    let match

    while ((match = imageRegex.exec(content)) !== null) {
        urls.push(match[1])
    }

    return urls
}
