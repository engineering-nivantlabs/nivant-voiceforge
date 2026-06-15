const HEYGEN_KEY = import.meta.env.VITE_HEYGEN_API_KEY

export async function createSpokesperson(params: {
  script: string
  avatarId: string
  voiceId: string
}) {
  if (!HEYGEN_KEY) {
    return { id: "mock-video-id", status: "processing", eta: 120 }
  }

  const res = await fetch("https://api.heygen.com/v2/video/generate", {
    method: "POST",
    headers: {
      "X-Api-Key": HEYGEN_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      video_inputs: [{
        character: { type: "avatar", avatar_id: params.avatarId },
        voice: { type: "text", input_text: params.script, voice_id: params.voiceId },
      }],
    }),
  })

  return res.json()
}

export async function getVideoStatus(videoId: string) {
  const res = await fetch(`https://api.heygen.com/v1/video_status.get?video_id=${videoId}`, {
    headers: { "X-Api-Key": HEYGEN_KEY! },
  })
  return res.json()
}
