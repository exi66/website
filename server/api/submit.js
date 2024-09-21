import axios from "axios";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  if (!body.name || !body.email || !body.message) {
    throw createError({
      statusCode: 400,
      statusMessage: "NAME, EMAIL and MESSAGE are required fields!",
    });
  }
  if (typeof body.name !== "string") {
    throw createError({
      statusCode: 400,
      statusMessage: "NAME should be an string",
    });
  }
  if (typeof body.email !== "string" || validateEmail(body.email) === null) {
    throw createError({
      statusCode: 400,
      statusMessage: "EMAIL should be an valid email",
    });
  }
  if (typeof body.message !== "string") {
    throw createError({
      statusCode: 400,
      statusMessage: "MESSAGE should be an string",
    });
  }

  try {
    if (process.env.DISCORD_WEB_HOOK) {
      await axios.post(process.env.DISCORD_WEB_HOOK, {
        content: `Name: ${body.name}\nEmail: ${body.email}\nMessage: ${body.message}`,
      });
    }
    return {
      success: true,
    };
  } catch (e) {
    throw createError({
      statusCode: 400,
      statusMessage: e.message,
    });
  }
});

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};
