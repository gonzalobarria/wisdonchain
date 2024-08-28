const serializeDocuments = (
  documents: { content: any; metadata: { source: string } }[]
) => {
  const docsArray = documents.map((doc) => ({
    page_content: doc.content,
    metadata: doc.metadata,
  }))

  return JSON.stringify(docsArray)
}

export const upload = async (formData: any): Promise<string> => {
  const response = await fetch(
    "https://api.pinata.cloud/pinning/pinFileToIPFS",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.PINATA_API_KEY}`,
      },
      body: formData,
    }
  )

  // Handle the response from Pinata
  if (!response.ok) {
    const errorResponse = await response.json()
    console.log({
      message: "Failed to upload file to IPFS",
      error: errorResponse.error,
    })
  }

  const contentID = await response.json()
  const ipfsHash = contentID.IpfsHash

  return ipfsHash
}

export const uploadToPinata = async (
  documents: { content: any; metadata: { source: string } }[]
) => {
  const formData = new FormData()
  const serializedData = serializeDocuments(documents)
  const blob = new Blob([serializedData], { type: "application/json" })

  formData.append("file", blob, "data.json")

  const cid = await upload(formData)

  return cid
}
