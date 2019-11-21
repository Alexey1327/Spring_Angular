package ru.lanit.angulardemo.notebook.web.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.lanit.angulardemo.notebook.dto.NoteDto;
import ru.lanit.angulardemo.notebook.entity.Note;
import ru.lanit.angulardemo.notebook.repository.NoteRepositoryInterface;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@RestController
public class NoteBookController {

    private final NoteRepositoryInterface noteRepository;

    public NoteBookController(NoteRepositoryInterface noteRepository) {
        this.noteRepository = noteRepository;
    }

    @GetMapping("/get")
    public ResponseEntity getData() {

        List<Note> notes = this.noteRepository.findAll();

        List<NoteDto> noteDtos = new ArrayList<>();
        if (notes != null) {
            for (Note note : notes) {
                noteDtos.add(new NoteDto(
                    note.getId(),
                    note.getTitle(),
                    note.getPriority(),
                    note.getDate()
                ));
            }
        }

        return ResponseEntity.ok(noteDtos);
    }


    @GetMapping("/save")
    public ResponseEntity save() {

        noteRepository.saveAndFlush(new Note(
            "Заметка",
            "Бла бла бла",
            1,
             LocalDate.now()
        ));

        return ResponseEntity.ok().body("saved");
    }
}
