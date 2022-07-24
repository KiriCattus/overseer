package dev.tophatcat.mimir.commands;

import com.jagrosh.jdautilities.command.SlashCommand;
import com.jagrosh.jdautilities.command.SlashCommandEvent;
import dev.tophatcat.mimir.utils.MimirUtilities;
import net.dv8tion.jda.api.EmbedBuilder;

public class CmdCatFacts extends SlashCommand {

    public CmdCatFacts() {
        name = "catfacts";
        aliases = new String[]{"cat-facts", "catfact", "cat-fact"};
        category = new Category("Fun");
        help = "Get a random fact about cats, you learn something new every day nyan!";
        guildOnly = false;
    }

    @Override
    protected void execute(SlashCommandEvent event) {
        final EmbedBuilder embedBuilder = new EmbedBuilder();
        final var catFact = MimirUtilities.getCatFact();

        if (!catFact.isBlank()) {
            embedBuilder.setColor(MimirUtilities.RANDOM.nextInt(0x1000000));
            embedBuilder.appendDescription(catFact);
            embedBuilder.setFooter("Purrwered by https://catfact.ninja");

            event.replyEmbeds(embedBuilder.build()).queue();
        }
    }
}
