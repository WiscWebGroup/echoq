package org.echoq.service;

import org.echoq.entity.Questions;
import com.baomidou.mybatisplus.extension.service.IService;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author HaroldCI
 * @since 2022-05-20
 */
public interface IQuestionsService extends IService<Questions> {
    int insertQuestion(String ip, String question, int userId);
}
