import { Badge } from "@/components/ui/badge";

export const CardTags = ({ tags }: { tags: string[] }) => (
  <div className="flex flex-row flex-wrap items-center justify-start gap-1">
    {tags.map((t) => (
      <Badge className="font-normal" key={t}>
        {t}
      </Badge>
    ))}
  </div>
);
