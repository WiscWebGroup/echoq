package org.echoq.service.impl;

import org.echoq.entity.Questions;
import org.echoq.dao.QuestionsMapper;
import org.echoq.service.IQuestionsService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author HaroldCI
 * @since 2022-05-20
 */
@Service
public class QuestionsServiceImpl extends ServiceImpl<QuestionsMapper, Questions> implements IQuestionsService {

    @Resource
    QuestionsMapper mapper;

    @Override
    public int insertQuestion(String ip, String question, int userId) {
        Questions questions = new Questions();
        questions.setAnonyip(ip);
        questions.setQuestion(question);
        questions.setUserid(userId);
        return mapper.insertQuestion(questions);
    }
}
