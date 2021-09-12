import { google } from '@google-cloud/pubsub/build/protos/protos';
import puppeteer from 'puppeteer';
import IPubsubMessage = google.pubsub.v1.IPubsubMessage;

const pubsubMessageDecoder = ({ data } : IPubsubMessage): string => {
  if (typeof data === 'string') {
    return Buffer.from(data, 'base64').toString();
  } if (data === null) {
    return '';
  }
  return new TextDecoder().decode(data);
};

const handler = async (pubsubMessage: IPubsubMessage): Promise<void> => {
  const payloadJson = pubsubMessageDecoder(pubsubMessage);
  const { keywords } = JSON.parse(payloadJson) as { keywords: string[] };

  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  const searchUrl = `https://www.google.com/search?q=${keywords.map((keyword) => encodeURIComponent(keyword)).join('+')}`;
  await Promise.all([
    page.goto(searchUrl),
    page.waitForNavigation({ waitUntil: 'load' }),
  ]);
};
export { handler };
