'use client'

import { UploadDropzone } from '@/lib/uploadthing'
import React from 'react'
import "@uploadthing/react/styles.css"


interface FileUploadProps {
    endPoint: 'messageFile' | 'serverImage'
    value: string
    onChange: (url?: string) => void
    }

const FileUpload = ({endPoint, value, onChange}:FileUploadProps) => {
  return (
    <div>FileUpload</div>
  )
}

export default FileUpload