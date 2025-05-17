import { CHAPTER_NOTES_TABLE, STUDY_MATERIAL_TABLE, STUDY_TYPE_CONTENT_TABLE, USER_TABLE } from "@/configs/schema";
import { inngest } from "./client";
import { db } from "@/configs/db";
import { eq } from "drizzle-orm";
import { generateNotesAiModel, GenerateQaAiModel, GenerateQuizAiModel, GenerateStudyTypeContentAiModel } from "@/configs/AiModel";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "1s");
    return { event, body: "Hello, World!" };
  }
);

export const CreateNewUser = inngest.createFunction(
  { id: "create-user" },
  { event: "user.create" },
  async ({ event, step }) => {
    const { user } = event.data;
    //Get Event Data
    const result = await step.run(
      "check user and create new if not in DB",
      async () => {
        //Check is user already exist
        const result = await db
          .select()
          .from(USER_TABLE)
          .where(eq(USER_TABLE.email, user?.primaryEmailAddress?.emailAddress));

        if (result?.length == 0) {
          //if Not, Then add to DB
          const userResp = await db
            .insert(USER_TABLE)
            .values({
              name: user?.fullName,
              email: user?.primaryEmailAddress?.emailAddress,
            })
            .returning({ id: USER_TABLE.id });
          return userResp;
        }
        return result;
      }
    );
    return "success";
  }

  //step is to welcome send email notification
  //step to send email notification  After 3 Days Once user joining
);

export const GenerateNotes = inngest.createFunction(
  { id: "generate-course" },
  { event: "notes.generate" },
  async ({ event, step }) => {
    const { course } = event.data;

    const notesResult = await step.run("Generate Chapter Notes", async () => {
    const Chapters = course?.courseLayout?.chapters;
      let index = 0;
      Chapters.forEach(async (chapter) => {
       const PROMPT="Generate exam material detail content for each chapter , The chapters: " + JSON.stringify(chapter)
        const result = await generateNotesAiModel.sendMessage(PROMPT);

        // Generate notes using AI model
        const aiResp = result.response.text();

        // Insert the generated notes into the database
        await db.insert(CHAPTER_NOTES_TABLE).values({
          chapterId: index,
          courseId: course?.courseId,
          notes: aiResp, 
        });

        index = index + 1;
      });
      return "Chapter Notes Generated";
    });

    // Update course status to "Ready"
    const updateCourseStatusResult = await step.run(
      "Update Course Status to Ready",
      async () => {
        await db
          .update(STUDY_MATERIAL_TABLE)
          .set({status: 'Ready' })
          .where(eq(STUDY_MATERIAL_TABLE.courseId, course?.courseId));
        return "Course Status Updated to Ready";
      }
    );
  }
);

export const GenerateStudyTypeContent = inngest.createFunction(
  { id: "Generate Study Type Content" },
  { event: "studyType.content" },
  async ({ event, step }) => {
    const { studyType, prompt, courseId, recordId } = event.data;
    const AIResult = await step.run(
      "Generating Flashcard using AI",
      async () => {
        const result =
          studyType == "Flashcard"
            ? await GenerateStudyTypeContentAiModel.sendMessage(prompt)
            : studyType == "Quiz"
            ? await GenerateQuizAiModel.sendMessage(prompt)
            : await GenerateQaAiModel.sendMessage(prompt);
        const AIResult = JSON.parse(result.response.text());
        return AIResult;
      }
    );
    const DbResult = await step.run("Save Result to DB", async () => {
      const result = await db
        .update(STUDY_TYPE_CONTENT_TABLE)
        .set({
          content: AIResult,
          status: "Ready",
        }).where(eq(STUDY_TYPE_CONTENT_TABLE.id, recordId));
      return "Data Inserted";
    });
  }
);

// Return the combined results



