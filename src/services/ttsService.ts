const ELEVENLABS_KEY = import.meta.env.VITE_ELEVENLABS_API_KEY

export interface Voice {
  id: string
  name: string
  preview_url?: string
  category: string
}

export async function getVoices(): Promise<Voice[]> {
  if (!ELEVENLABS_KEY) {
    return [
      { id: "v1", name: "Rachel", category: "professional" },
      { id: "v2", name: "Clyde", category: "deep" },
      { id: "v3", name: "Domi", category: "energetic" },
      { id: "v4", name: "Bella", category: "warm" },
      { id: "v5", name: "Antoni", category: "crisp" },
      { id: "v6", name: "Thomas", category: "calm" },
    ]
  }

  const res = await fetch("https://api.elevenlabs.io/v1/voices", {
    headers: { "xi-api-key": ELEVENLABS_KEY },
  })
  const data = await res.json()
  return data.voices
}

export async function synthesize(text: string, voiceId: string): Promise<Blob> {
  if (!ELEVENLABS_KEY) throw new Error("ElevenLabs API key required")

  const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
    method: "POST",
    headers: {
      "xi-api-key": ELEVENLABS_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text,
      model_id: "eleven_multilingual_v2",
      voice_settings: { stability: 0.5, similarity_boost: 0.75 },
    }),
  })

  return res.blob()
}
