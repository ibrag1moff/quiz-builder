import { Container } from "@/components/Container";
import { Page } from "@/components/Page";
import { CreateQuizForm } from "@/components/CreateQuizForm";

export default function CreateQuizPage() {
  return (
    <Page className="pb-20">
      <Container>
        <h1 className="text-3xl font-bold text-white mb-6">
          Create a New Quiz
        </h1>
        <CreateQuizForm />
      </Container>
    </Page>
  );
}
