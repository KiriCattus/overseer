package dev.tophatcat.mimir.utils;

import com.google.gson.JsonParser;
import dev.tophatcat.mimir.Mimir;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.URL;
import java.net.URLConnection;
import java.nio.charset.StandardCharsets;
import java.util.Random;

public class MimirUtilities {

    /**
     * Used to set a random color in embeds.
     */
    public static final Random RANDOM = new Random();

    /**
     * Gets a cat fact.
     *
     * @return a cat fact
     */
    public static String getCatFact() {
        try {
            final var url = new URL("https://catfact.ninja/fact");
            final URLConnection connection = url.openConnection();
            connection.setConnectTimeout(10 * 1000);
            final var reader = new BufferedReader(
                    new InputStreamReader(connection.getInputStream(), StandardCharsets.UTF_8));
            final String inputLine = reader.readLine();
            reader.close();
            final var objectArray = JsonParser.parseString(inputLine).getAsJsonObject();
            return ":cat:  " + objectArray.get("fact").toString();

        } catch (final RuntimeException exception) {
            throw exception;
        } catch (final Exception exception) {
            Mimir.LOGGER.error("Error getting cat fact...", exception);
            exception.printStackTrace();
        }
        return "";
    }
}
