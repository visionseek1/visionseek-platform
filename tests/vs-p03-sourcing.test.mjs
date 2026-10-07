import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';

const root = path.resolve('.next/server/app');
const read = (route) => readFile(path.join(root, `${route}.html`), 'utf8');

const boundaryEn = 'The client pays the supplier directly. VisionSeek does not hold funds, does not trade, and does not guarantee a deal.';
const boundaryAr = 'يدفع العميل للمورد مباشرة. VisionSeek لا تحتفظ بالأموال، ولا تتاجر، ولا تضمن صفقة.';
const internal = /Upwork|Fiverr|Mostaql|InstaPay|\$250|D-8|RFQ board/i;

test('VS-P03 renders the K-Beauty first application and the deal boundary in both locales', async () => {
  const enList = await read('programs');
  const arList = await read('ar/programs');
  const en = await read('programs/trusted-sourcing');
  const ar = await read('ar/programs/trusted-sourcing');

  for (const html of [enList, en]) {
    assert.match(html, /VS-P03/);
    assert.match(html, /K-Beauty/);
    assert.match(html, /skincare only/);
    assert.match(html, /not makeup/);
    assert.match(html, /Working offer · first application/);
    assert.match(html, new RegExp(boundaryEn.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
    assert.doesNotMatch(html, internal);
  }
  for (const html of [arList, ar]) {
    assert.match(html, /VS-P03/);
    assert.match(html, /K-Beauty/);
    assert.match(html, /العناية بالبشرة فقط/);
    assert.match(html, /المكياج/);
    assert.match(html, /عرض قائم · التطبيق الأول/);
    assert.match(html, new RegExp(boundaryAr.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
    assert.doesNotMatch(html, internal);
  }

  const statusText = (html) => [...html.matchAll(/<span class="vs-status">([^<]*)<\/span>/g)].map((match) => match[1]);
  const enStatuses = statusText(enList);
  const arStatuses = statusText(arList);
  assert.equal(enStatuses.filter((status) => status === 'Proposed · not launched').length, 5);
  assert.equal(enStatuses.filter((status) => status === 'Working offer · first application').length, 1);
  assert.equal(arStatuses.filter((status) => status === 'مقترح · لم يُطلق').length, 5);
  assert.equal(arStatuses.filter((status) => status === 'عرض قائم · التطبيق الأول').length, 1);
  assert.doesNotMatch(en, /Proposed · not launched/);
  assert.doesNotMatch(ar, /مقترح · لم يُطلق/);
  assert.match(en, /What are we trying to do\?/);
  assert.match(en, /How is it done today, and what are the limits\?/);
  assert.match(en, /What is new in our approach\?/);
  assert.match(en, /Who cares\?/);
  assert.match(en, /What are the risks\?/);
  assert.match(en, /How do we know it worked\?/);
  assert.match(ar, /ما الذي نحاول فعله؟/);
  assert.match(ar, /كيف نعرف أن العمل أدى غرضه؟/);
  assert.match(en, /kbeautyexpo\.com\/fairContents\.do\?FAIRMENU_IDX=11815/);
  assert.match(en, /Request a sourcing-route verification/);
  assert.match(ar, /اطلب تحقق مسار توريد/);
  assert.match(en, /vs-sourcing-cover/);
  assert.match(en, /Sourcing-route verification · K-Beauty skincare/);
  assert.match(ar, /vs-sourcing-cover/);
  assert.match(ar, /تحقق مسار توريد · عناية بالبشرة الكورية/);
  for (const html of [enList, arList, en, ar]) assert.doesNotMatch(html, /field-drones\.jpg/);
  assert.match(enList, /mailto:abdelalim@visionseek\.org/);
  assert.match(enList, /wa\.me\/821042419606/);
  assert.match(arList, /mailto:abdelalim@visionseek\.org/);
  assert.match(arList, /wa\.me\/821042419606/);
});

test('Work With Us exposes the sourcing-route verification channels', async () => {
  const en = await read('work-with-us');
  const ar = await read('ar/work-with-us');
  assert.match(en, /id="sourcing-route-verification"/);
  assert.match(ar, /id="sourcing-route-verification"/);
  assert.match(en, /Request a sourcing-route verification/);
  assert.match(ar, /اطلب تحقق مسار توريد/);
  assert.match(en, new RegExp(boundaryEn.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  assert.match(ar, new RegExp(boundaryAr.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  for (const html of [en, ar]) {
    assert.match(html, /mailto:abdelalim@visionseek\.org/);
    assert.match(html, /wa\.me\/821042419606/);
    assert.match(html, /K-Beauty/);
    assert.doesNotMatch(html, /<form\b[^>]*sourcing/i);
    assert.doesNotMatch(html, internal);
  }
});
