import React, { useEffect, useState } from 'react'
import { StringInputProps, useFormValue, set } from 'sanity'
import { Stack, Text, Button, TextInput, Card } from '@sanity/ui'
import { CopyIcon } from '@sanity/icons'

export function NewsletterUrlInput(props: StringInputProps) {
  // Get the path and navigate up to find originalFilename and domain
  const { path } = props
  const filenamePath = [...path.slice(0, -1), 'originalFilename']
  const filename = useFormValue(filenamePath) as string | undefined
  
  // Get domain from the parent newsletterAssets document
  const domain = useFormValue(['domain']) as string | undefined
  
  const [copied, setCopied] = useState(false)
  
  const effectiveDomain = domain || 'sigeon.vercel.app'
  const generatedUrl = filename 
    ? `https://${effectiveDomain}/images/${filename}`
    : `https://${effectiveDomain}/images/your-image.jpg`

  // Auto-update the field value when filename changes
  useEffect(() => {
    if (generatedUrl !== props.value) {
      props.onChange(set(generatedUrl, []))
    }
  }, [generatedUrl, props])

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Stack space={3}>
      <Card padding={3} radius={2} shadow={1} tone="primary">
        <Stack space={2}>
          <Text size={1} weight="semibold">
            🔗 Newsletter URL (auto-generated)
          </Text>
          <TextInput
            value={generatedUrl}
            readOnly
            fontSize={1}
            padding={3}
          />
          <Button
            mode="ghost"
            icon={CopyIcon}
            text={copied ? '✓ Copied!' : 'Copy URL'}
            onClick={handleCopy}
            tone={copied ? 'positive' : 'default'}
          />
        </Stack>
      </Card>
    </Stack>
  )
}
