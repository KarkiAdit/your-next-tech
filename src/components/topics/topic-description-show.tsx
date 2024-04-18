import { postgresDb } from "@/db";

interface TopicDescriptionProps {
  slug: string
};

export default async function TopicDescriptionShow({ slug }: TopicDescriptionProps) {
    const topic = await postgresDb.topic.findFirst({
        where: { slug },
    });

  // Asssign meaningful description if no description provided
  let description: string;
  if (!topic || topic.description == ''){
    description ='This topic has no description. Learn from other sources about it.';
  } else {
    description = topic.description;
  }

  return (
    <div className="m-4">
      <p className="p-4 border rounded">{description}</p>
    </div>
  )
}
