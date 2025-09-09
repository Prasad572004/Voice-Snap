package com.Voicesnap.service;


import java.util.List;

import com.Voicesnap.entity.DocEntity;
import com.Voicesnap.entity.User;

public interface DocService {
	DocEntity saveDocx(User user, String text);
    List<DocEntity> listUserDocs(Long userId);
    DocEntity getDoc(Long id);
    void deleteDoc(Long id);
}
