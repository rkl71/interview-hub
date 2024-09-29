package com.hanyang.interview.esdao;

import com.hanyang.interview.model.dto.post.PostEsDTO;
import com.hanyang.interview.model.dto.question.QuestionEsDTO;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

import java.util.List;

/**
 * 题目 ES 操作
 *
 * @author <a href="https://github.com/rkl71">renkelin</a>
 * @from <a href="https://www.renkelin.vip">Kolin's space</a>
 */
public interface QuestionEsDao extends ElasticsearchRepository<QuestionEsDTO, Long> {

    List<PostEsDTO> findByUserId(Long userId);
}