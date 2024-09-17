"use server";
import Title from "antd/es/typography/Title";
import { Divider, Flex, message } from "antd";
import Link from "next/link";
import { listQuestionBankVoByPageUsingPost } from "@/api/questionBankController";
import { listQuestionVoByPageUsingPost } from "@/api/questionController";
import QuestionBankList from "@/components/QuestionBankList";
import QuestionList from "@/components/QuestionList";
import "./index.css";

/**
 * 主页
 * @constructor
 */
export default async function HomePage() {
  let questionBankList = [];
  let questionList = [];

  try {
    // 并发调用两个接口，使用 Promise.all
    const [questionBankRes, questionRes] = await Promise.all([
      listQuestionBankVoByPageUsingPost({
        pageSize: 12,
        sortField: "createTime",
        sortOrder: "descend",
      }),
      listQuestionVoByPageUsingPost({
        pageSize: 12,
        sortField: "createTime",
        sortOrder: "descend",
      }),
    ]);

    // 处理返回的数据
    questionBankList = questionBankRes.data.records ?? [];
    questionList = questionRes.data.records ?? [];
  } catch (e) {
    message.error("获取数据失败，" + e.message);
  }

  return (
    <div id="homePage" className="max-width-content">
      <Flex justify="space-between" align="center">
        <Title level={3}>最新题库</Title>
        <Link href={"/banks"}>查看更多</Link>
      </Flex>
      <QuestionBankList questionBankList={questionBankList} />
      <Divider />
      <Flex justify="space-between" align="center">
        <Title level={3}>最新题目</Title>
        <Link href={"/questions"}>查看更多</Link>
      </Flex>
      <QuestionList questionList={questionList} />
    </div>
  );
}
