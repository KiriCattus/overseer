/*
 * Mimir - https://github.com/KiriCattus/mimir
 * Copyright (C) 2016-2022 <KiriCattus>
 *
 * This library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation;
 * Specifically version 2.1 of the License.
 *
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public
 * License along with this library; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301
 * USA
 * https://www.gnu.org/licenses/old-licenses/lgpl-2.1.html
 */
package dev.tophatcat.mimir;

import io.github.cdimascio.dotenv.Dotenv;
import net.dv8tion.jda.api.JDABuilder;
import net.dv8tion.jda.api.entities.Activity;
import net.dv8tion.jda.api.requests.GatewayIntent;
import net.dv8tion.jda.api.utils.cache.CacheFlag;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.security.auth.login.LoginException;
import java.util.Set;

/**
 * The main entrypoint for the bot.
 */
public final class Mimir {

    /**
     * The name of the bot.
     */
    private static final String NAME = "Mimir";

    /**
     * The bot version number.
     */
    private static final String VERSION = "0.0.0";

    /**
     * Bot logger.
     */
    public static final Logger LOGGER = LoggerFactory.getLogger(NAME);

    /**
     * The intents we need for the bot.
     */
    private static final Set<GatewayIntent> INTENTS = Set.of(
            GatewayIntent.DIRECT_MESSAGES,
            GatewayIntent.GUILD_BANS,
            GatewayIntent.GUILD_EMOJIS_AND_STICKERS,
            GatewayIntent.GUILD_MESSAGE_REACTIONS,
            GatewayIntent.GUILD_MESSAGES,
            GatewayIntent.GUILD_MEMBERS);

    /**
     * The environment properties for the bot.
     */
    public static Dotenv dotenv = Dotenv.configure()
            .directory("mimir_configs")
                .filename(".env")
                .load();

    public static void main(String[] args) {
        LOGGER.info("Time to wake Mimir up...");
        LOGGER.info("Version: " + VERSION);

        try {
            final var botBuilder = JDABuilder
                    .create(Mimir.dotenv.get("BOT_TOKEN"), INTENTS)
                    .setActivity(Activity.of(Activity.ActivityType.WATCHING, "The World Burn..."))
                    .disableCache(CacheFlag.CLIENT_STATUS)
                    .disableCache(CacheFlag.ONLINE_STATUS)
                    .disableCache(CacheFlag.VOICE_STATE)
                    .disableCache(CacheFlag.ACTIVITY)
                    .setEnabledIntents(INTENTS);
            var jda = botBuilder.build().awaitReady();
        } catch (final LoginException exception) {
            LOGGER.error("An error occurred while trying to authenticate with Discord, please provide a"
                    + " valid token in '/mimir_configs/.env' file then try again.", exception);
            System.exit(1);
        } catch (InterruptedException exception) {
            LOGGER.error("Error awaiting caching...", exception);
        }

        LOGGER.info("Mimir, smartest man alive at your service!");
    }
}
