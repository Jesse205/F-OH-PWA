export interface BeforeInstallPrompt extends Event {
  prompt: () => void
  userChoice: Promise<() => void>
}
