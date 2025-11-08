import React, { useEffect, useCallback, useState } from 'react'
import { StringInputProps, useFormValue, set, unset, useClient } from 'sanity'
import { TextInput, Button, Flex, Text } from '@sanity/ui'

export function FilenameInput(props: StringInputProps) {
  const { value, onChange, path } = props
  const client = useClient({ apiVersion: '2024-01-01' })
  const [isGenerating, setIsGenerating] = useState(false)
  
  // Get the asset from the parent image field - go up one level to get the asset
  const imagePath = path.slice(0, -1) // Remove 'originalFilename' to get image path
  const assetPath = [...imagePath, 'asset'] // Add 'asset' to get asset reference
  const assetValue = useFormValue(assetPath) as any
  
  console.log('🔧 FILENAME INPUT LOADED!')
  console.log('  - field path:', path)
  console.log('  - image path:', imagePath) 
  console.log('  - asset path:', assetPath)
  console.log('  - asset value:', JSON.stringify(assetValue, null, 2))
  
  const generateFilenameFromAsset = useCallback(async (assetRef: string) => {
    if (!assetRef) return null
    
    try {
      console.log('🔍 Fetching asset data for:', assetRef)
      
      // Query asset metadata using Sanity client - check for originalFilename field
      const asset = await client.fetch(`*[_id == $ref][0]{originalFilename, _id, url, metadata}`, { ref: assetRef })
      
      console.log('📄 Asset data received:', JSON.stringify(asset, null, 2))
      
      // Check if originalFilename exists in asset
      if (asset?.originalFilename) {
        console.log('✅ Found originalFilename in asset:', asset.originalFilename)
        return asset.originalFilename
      }
      
      // Alternative: check metadata for filename
      if (asset?.metadata?.filename) {
        console.log('✅ Found filename in metadata:', asset.metadata.filename)
        return asset.metadata.filename
      }
      
      // Fallback 1: Extract from asset URL if available
      if (asset?.url) {
        try {
          const urlParts = asset.url.split('/')
          const filename = urlParts[urlParts.length - 1]
          if (filename && filename.includes('.')) {
            console.log('🔄 Extracted filename from URL:', filename)
            return filename
          }
        } catch {
          console.log('Could not extract from URL')
        }
      }
      
      // Fallback 2: Extract extension from asset reference
      if (assetRef.startsWith('image-')) {
        const parts = assetRef.split('-')
        const format = parts[parts.length - 1]
        const extension = format === 'jpg' ? '.jpg' : 
                         format === 'png' ? '.png' :
                         format === 'jpeg' ? '.jpeg' :
                         format === 'gif' ? '.gif' :
                         format === 'webp' ? '.webp' : '.jpg'
        
        const suggestedName = `newsletter-image${extension}`
        console.log('🔄 Using format-based filename:', suggestedName)
        return suggestedName
      }
      
      console.log('⚠️ No filename data found, using default')
      return 'newsletter-image.jpg'
      
    } catch (error) {
      console.error('❌ Error fetching asset data:', error)
      return 'newsletter-image.jpg'
    }
  }, [client])

  useEffect(() => {
    // Auto-populate filename when asset is uploaded and filename is empty
    const assetRef = assetValue?._ref
    
    console.log('🎯 Effect triggered:')
    console.log('  - assetRef:', assetRef)
    console.log('  - current value:', value)
    console.log('  - assetValue structure:', JSON.stringify(assetValue, null, 2))
    
    if (assetRef && !value) {
      console.log('⚡ Generating filename for asset:', assetRef)
      
      // Add small delay to ensure asset is fully processed
      setTimeout(() => {
        generateFilenameFromAsset(assetRef).then(suggestedFilename => {
          if (suggestedFilename && !value) {
            console.log('✨ Auto-setting filename to:', suggestedFilename)
            onChange(set(suggestedFilename))
          }
        })
      }, 1000) // Wait 1s for asset to be fully processed and indexed
    }
  }, [assetValue, value, onChange, generateFilenameFromAsset])

  const handleAutoDetect = useCallback(async () => {
    const assetRef = assetValue?._ref
    console.log('🔘 Manual auto-detect clicked for asset:', assetRef)
    
    if (assetRef) {
      setIsGenerating(true)
      try {
        const suggestedFilename = await generateFilenameFromAsset(assetRef)
        if (suggestedFilename) {
          console.log('✅ Setting filename manually to:', suggestedFilename)
          onChange(set(suggestedFilename))
        }
      } catch (error) {
        console.error('❌ Manual detection failed:', error)
      } finally {
        setIsGenerating(false)
      }
    }
  }, [assetValue, generateFilenameFromAsset, onChange, setIsGenerating])

  return (
    <Flex gap={2} align="center">
      <TextInput
        value={value || ''}
        placeholder="e.g., biomed.jpg, header-november.png"
        onChange={(event) => {
          const inputValue = event.currentTarget.value
          onChange(inputValue ? set(inputValue) : unset())
        }}
        id={props.id}
        readOnly={props.readOnly}
        style={{ flex: 1 }}
      />
      {assetValue?._ref && (
        <Button
          text={isGenerating ? "Detecting..." : "Auto-detect"}
          tone="primary"
          mode="ghost"
          onClick={handleAutoDetect}
          disabled={isGenerating}
        />
      )}
      {!assetValue?._ref && (
        <Text size={1} muted>Upload image first</Text>
      )}
    </Flex>
  )
}