package org.echoq;

import org.echoq.util.AESUtils;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.context.web.WebAppConfiguration;

@SpringBootTest
@RunWith(SpringRunner.class)
@WebAppConfiguration
public class PasswordTest {

    @Test
    public static void passwordTest() throws Exception {
        String de = AESUtils.aesDecodeStr("9tgV1H+dNcuPGpUgJutbQA==", AESUtils.getPkey());
        String d2 = "9tgV1H+dNcuPGpUgJutbQA==";
        System.out.println(de);
    }
}
