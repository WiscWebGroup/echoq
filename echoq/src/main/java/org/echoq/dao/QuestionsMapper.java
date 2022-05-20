package org.echoq.dao;

import org.apache.ibatis.annotations.Mapper;
import org.echoq.entity.Questions;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;

/**
 * <p>
 *  Mapper 接口
 * </p>
 *
 * @author HaroldCI
 * @since 2022-05-20
 */
@Mapper
public interface QuestionsMapper extends BaseMapper<Questions> {
    int insertQuestion(Questions questions);
}
