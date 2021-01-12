package com.github.damianmcdonald.offeranalysis.services;

import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.*;

@Service
public class FileReaderImpl implements FileReaderService {

    private static final String EMBEDDED_FILE_PATH = "/static/assets/data/dataset.csv";

    @Value("${dataset.embedded}")
    private boolean datasetUseEmbedded;

    @Value("${dataset.filepath}")
    private String datasetFilepath;

    public byte[] readFile() {
        if (datasetUseEmbedded) {
            try {
                return readFile(datasetUseEmbedded);
            } catch (Exception ex) {
                ex.printStackTrace();
                throw new RuntimeException(ex);
            }
        }
        if(!datasetUseEmbedded) {
            try {
                return readFileFromPath();
            } catch (Exception ex) {
                ex.printStackTrace();
                throw new RuntimeException(ex);
            }
        }
        return null;
    }

    private byte[] readFile(final boolean useEmbedded) throws IOException {
        return useEmbedded ? readFileEmbedded() : readFileFromPath();
    }

    private byte[] readFileEmbedded() throws IOException {
        final InputStream inputStream = FileReaderImpl.class.getResourceAsStream(EMBEDDED_FILE_PATH);
        return inputStream != null ? IOUtils.toByteArray(inputStream) : null;
    }

    private byte[] readFileFromPath() throws IOException {
        return IOUtils.toByteArray(
                new FileInputStream(
                        new File(datasetFilepath)
                        )
                );
    }
}
