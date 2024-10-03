package com.hanyang.interview.model.dto.questionBankQuestion;

import lombok.Data;

import java.io.Serializable;
import java.util.List;

/**
 * 批量从题库移除题目关联请求
 *
 * @author <a href="https://github.com/rkl71">renkelin</a>
 * @from <a href="https://www.renkelin.vip">Kolin's space</a>
 */
@Data
public class QuestionBankQuestionBatchRemoveRequest implements Serializable {

    /**
     * 题库 id
     */
    private Long questionBankId;

    /**
     * 题目 id 列表
     */
    private List<Long> questionIdList;
    private static final long serialVersionUID = 1L;
}
