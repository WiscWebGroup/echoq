package org.echoq.util;

import org.apache.commons.codec.binary.Base64;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;

public class FileOperation {
    public static String getBase64Image(File file)
    {
        try {
            InputStream finput = new FileInputStream(file);
            byte[] imageBytes = new byte[(int)file.length()];
            finput.read(imageBytes, 0, imageBytes.length);
            finput.close();
            return Base64.encodeBase64String(imageBytes);
        } catch (Exception e)
        {
            System.out.println("Exception Occurred At FileOperation Class");
            e.printStackTrace();
        }
        return "NA";
    }
}
