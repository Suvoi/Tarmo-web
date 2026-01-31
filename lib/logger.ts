type LogLevel = "DEBUG" | "INFO" | "WARN" | "ERROR"

const levels: Record<LogLevel, number> = {
  DEBUG: 10,
  INFO: 20,
  WARN: 30,
  ERROR: 40,
}

const isServer = typeof window === "undefined"

const envLevel = isServer
  ? (process.env.LOG_LEVEL as LogLevel | undefined)
  : (process.env.NEXT_PUBLIC_LOG_LEVEL as LogLevel | undefined)

const currentLevel: LogLevel | null = envLevel ?? null

function log(level: LogLevel, message: string, ...args: any[]) {
  if (!currentLevel) {
    if (level !== "ERROR") return
  } else {
    if (levels[level] < levels[currentLevel]) return
  }

  const prefix = `[###${level}###]`

  switch (level) {
    case "ERROR":
      console.error(prefix, message, ...args)
      break
    case "WARN":
      console.warn(prefix, message, ...args)
      break
    default:
      console.log(prefix, message, ...args)
  }
}

export const logger = {
  debug: (msg: string, ...args: any[]) => log("DEBUG", msg, ...args),
  info:  (msg: string, ...args: any[]) => log("INFO", msg, ...args),
  warn:  (msg: string, ...args: any[]) => log("WARN", msg, ...args),
  error: (msg: string, ...args: any[]) => log("ERROR", msg, ...args),
}
