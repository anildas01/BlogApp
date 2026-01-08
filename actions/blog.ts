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
        redirect('/admin/blog/create?error=Failed to create post')
    }

    revalidatePath('/blog')
    revalidatePath('/admin/blog')
    redirect('/admin/blog')
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
        throw new Error('Failed to update post')
    }

    revalidatePath('/blog')
    revalidatePath('/admin/blog')
    redirect('/admin/blog')
}

export async function deletePost(id: number) {
    const supabase = await createClient()

    const { error } = await supabase.from('posts').delete().eq('id', id)

    if (error) {
        console.error('Error deleting post:', error)
        throw new Error('Failed to delete post')
    }

    revalidatePath('/blog')
    revalidatePath('/admin/blog')
}
