interface BeforeInstallPromptEvent extends Event {
  prompt: () => void
  platforms: string
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform?: string }>
}
