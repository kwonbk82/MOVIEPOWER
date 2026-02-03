package com.power.movie_ranger;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication
public class MovieRangerApplication {

	public static void main(String[] args) {
		try {
			Dotenv dotenv = Dotenv.configure()
					.directory("./") // .env 파일 위치 (프로젝트 루트)
					.ignoreIfMissing()
					.load();

			dotenv.entries().forEach(entry -> {
				System.setProperty(entry.getKey(), entry.getValue());
				// [확인용] 실제로 키를 읽어오는지 콘솔에 찍어봅니다.
				if (entry.getKey().contains("API_KEY")) {
					System.out.println("✅ 키 로드 성공: " + entry.getKey());
				}
			});
		} catch (Exception e) {
			System.err.println("⚠️ .env 로드 중 오류 발생: " + e.getMessage());
		}
		SpringApplication.run(MovieRangerApplication.class, args);
	}

}
