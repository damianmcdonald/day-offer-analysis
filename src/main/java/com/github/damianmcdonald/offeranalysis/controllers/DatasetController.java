package com.github.damianmcdonald.offeranalysis.controllers;

import com.github.damianmcdonald.offeranalysis.services.FileReaderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/v1")
public class DatasetController {

    @Autowired
    FileReaderService fileReader;

    @RequestMapping(
            value = "/dataset",
            method = RequestMethod.GET,
            produces = MediaType.TEXT_PLAIN_VALUE
    )
    @ResponseBody
    public byte[] getDataset() {
        return fileReader.readFile();
    }

}
