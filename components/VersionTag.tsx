import { Badge } from "@/components/ui/badge";

export default function VersionTag() {
  return (
    <Badge variant={"secondary"} className="fixed bottom-3 left-3 opacity-70 z-[9999]">
      v0.0.1
    </Badge>
  );
}