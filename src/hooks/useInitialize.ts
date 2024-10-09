import { useEffect } from 'react'
import { useFileContentStore } from '../stores/useFileContentStore'
import { useVectorStore } from '../stores/useVectorStore'

export const useInitialize = () => {
    const { initContent } = useFileContentStore()
    const { initVectors } = useVectorStore()

    useEffect(() => {
        initContent()
    }, [initContent])

    useEffect(() => {
        initVectors()
    }, [initVectors])
}

