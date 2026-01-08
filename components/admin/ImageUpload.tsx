'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { createClient } from '@/lib/supabase/client'
import { Upload, X, Loader2, Image as ImageIcon } from 'lucide-react'

interface ImageUploadProps {
    value?: string
    onChange: (url: string) => void
    disabled?: boolean
    bucketName?: string
}

export function ImageUpload({ value, onChange, disabled, bucketName = 'portfolio-images' }: ImageUploadProps) {
    const [isUploading, setIsUploading] = useState(false)
    const supabase = createClient()

    async function onSelectFile(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0]
            onUpload(file)
        }
    }

    async function onUpload(file: File) {
        setIsUploading(true)

        try {
            const fileExt = file.name.split('.').pop()
            const fileName = `${Math.random().toString(36).substring(7)}.${fileExt}`
            const { data, error } = await supabase.storage
                .from(bucketName)
                .upload(fileName, file, {
                    upsert: false
                })

            if (error) throw error

            const { data: { publicUrl } } = supabase.storage.from(bucketName).getPublicUrl(fileName)

            onChange(publicUrl)

        } catch (e: any) {
            console.error("Upload error:", e)
            alert("Upload failed: " + (e.message || "Unknown error"))
        } finally {
            setIsUploading(false)
        }
    }

    return (
        <div className="space-y-4">
            {value ? (
                <div className="relative group border rounded-lg overflow-hidden w-full h-48 bg-secondary/10">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={value} alt="Preview" className="w-full h-full object-cover" />
                    <button
                        type="button"
                        onClick={() => onChange('')}
                        className="absolute top-2 right-2 bg-destructive text-destructive-foreground p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>
            ) : (
                <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-muted-foreground hover:bg-secondary/5 transition-colors cursor-pointer relative">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={onSelectFile}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        disabled={disabled || isUploading}
                    />
                    <div className="flex flex-col items-center gap-2">
                        {isUploading ? (
                            <>
                                <Loader2 className="w-8 h-8 animate-spin" />
                                <span className="text-sm font-medium">Uploading...</span>
                            </>
                        ) : (
                            <>
                                <Upload className="w-8 h-8" />
                                <span className="text-sm font-medium">Click to upload image</span>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}
