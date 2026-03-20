package com.power.movie_ranger.service;

import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileOutputStream;
import java.util.UUID;

@Service
public class FileService {
    public String uploadFile(String uploadPath,
                             String originalFileName,
                             byte[] fileData) throws Exception {

        //uuid를 이용하여 고유한 파일 이름을 생성하기 위해 사용
        UUID uuid = UUID.randomUUID();

        //확장자 추출
        String extension = originalFileName.substring(originalFileName.lastIndexOf("."));

        //uuid와 확장자를 결합하여 저장할 파일명 생성
        String savedFileName = uuid.toString() + extension;

        //파일이 업로드될 전체 경로를 생성
        String fileUploadFullUrl = uploadPath + "/" + savedFileName;

        //입출력 스트림을 생성하여 파일 경로에 해당하는 파일을 생성 or 덮어쓰기 객체 생성
        FileOutputStream fos = new FileOutputStream(fileUploadFullUrl);

        //파일에 작성
        fos.write(fileData);

        //스트림 닫기
        fos.close();

        //저장한 파일명을 리턴
        return savedFileName;
    }

    //등록된 파일 삭제
    public void deleteFile(String filePath) throws Exception {
        File deleteFile = new File(filePath);

        if (deleteFile.exists()) {
            deleteFile.delete();
        } else {
            System.out.println("파일이 존재하지 않음");
        }

    }
}
