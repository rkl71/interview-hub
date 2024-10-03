package com.hanyang.interview.model.dto.question;

import lombok.Data;

import java.io.Serializable;
import java.util.List;

/**
 * 批量删除题目请求
 *
 * @author <a href="https://github.com/rkl71">renkelin</a>
 * @from <a href="https://www.renkelin.vip">Kolin's space</a>
 */
@Data
public class QuestionBatchDeleteRequest implements Serializable {
    /**
     * 题目 id 列表
     */
    private List<Long> questionIdList;
    private static final long serialVersionUID = 1L;
}