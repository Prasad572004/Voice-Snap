package com.Voicesnap.service;

import com.Voicesnap.entity.DocEntity;
import com.Voicesnap.entity.User;
import com.Voicesnap.repository.DocRepository;
import com.Voicesnap.repository.UserRepository;
import com.Voicesnap.service.DocService;
import org.apache.poi.xwpf.usermodel.XWPFDocument;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.util.List;

@Service
public class DocServiceImpl implements DocService {

    private final DocRepository docRepository;

    public DocServiceImpl(DocRepository docRepository) {
        this.docRepository = docRepository;
    }

    @Override
    public DocEntity saveDocx(User user, String text) {
        try {
            XWPFDocument document = new XWPFDocument();
            document.createParagraph().createRun().setText(text);

            ByteArrayOutputStream out = new ByteArrayOutputStream();
            document.write(out);
            document.close();

            DocEntity doc = DocEntity.builder()
                    .user(user)
                    .filename("document_" + System.currentTimeMillis() + ".docx")
                    .contentType("application/vnd.openxmlformats-officedocument.wordprocessingml.document")
                    .data(out.toByteArray())
                    .build();

            return docRepository.save(doc);
        } catch (Exception e) {
            throw new RuntimeException("Error saving DOCX file: " + e.getMessage());
        }
    }

    @Override
    public List<DocEntity> listUserDocs(Long userId) {
        return docRepository.findByUserId(userId);
    }

    @Override
    public DocEntity getDoc(Long id) {
        return docRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Document not found"));
    }

    @Override
    public void deleteDoc(Long id) {
        docRepository.deleteById(id);
    }
}
