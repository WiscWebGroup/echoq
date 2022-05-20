package org.echoq.config;

import com.baomidou.mybatisplus.core.incrementer.IKeyGenerator;
import com.baomidou.mybatisplus.extension.incrementer.H2KeyGenerator;
import com.baomidou.mybatisplus.extension.plugins.PaginationInterceptor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * @Author: fun
 * @Description: 分页拦截器
 * @Date: 2020/9/10 10:26
 * @Version: 1.0.0
 */@Configuration
public class MybatisPlusConfig {
    /**
     * 注入主键生成器 */ @Bean
    public IKeyGenerator keyGenerator() {
        return new H2KeyGenerator();
    }
    /**
     * 分页插件 */ @Bean
    public PaginationInterceptor paginationInterceptor() {
        return new PaginationInterceptor();
    }
}