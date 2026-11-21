/**
 * Bapper Labs form receiver (Google Apps Script, bound to a Google Sheet).
 *
 * What it does: every Book a call / service-page form submission is
 *   1. added as a row to the "Leads" tab of the sheet this script lives in, and
 *   2. emailed to hello@bapperlabs.com, with Reply-To set to the visitor's email when they gave one.
 *
 * Setup (once, signed in as the Google account that owns hello@bapperlabs.com):
 *   1. Create a Google Sheet named "Bapper Leads". Extensions > Apps Script. Paste this file. Save.
 *   2. Deploy > New deployment > Web app. Execute as: Me. Who has access: Anyone. Deploy, and allow the
 *      permissions it asks for (write to this sheet, send email as you).
 *   3. Copy the web app URL (https://script.google.com/macros/s/.../exec) into data-endpoint="" on
 *      start.html and the five capabilities/*.html forms, then publish the site.
 */
var TO = 'hello@bapperlabs.com';
var TAB = 'Leads';
var FIELDS = ['source', 'business', 'name', 'city', 'website', 'breaks_first', 'audience',
              'phone', 'sms_consent', 'email', 'note', 'message'];

function doPost(e) {
  var p = (e && e.parameter) || {};
  // Honeypot: real people leave this hidden field empty. Answer "ok" so bots learn nothing.
  if (p._gotcha) { return reply_({ ok: true }); }

  var lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(TAB) ||
                SpreadsheetApp.getActiveSpreadsheet().insertSheet(TAB);
    if (sheet.getLastRow() === 0) { sheet.appendRow(['received'].concat(FIELDS)); }
    sheet.appendRow([new Date()].concat(FIELDS.map(function (k) { return clean_(p[k]); })));
  } finally {
    lock.releaseLock();
  }

  var who = clean_(p.business) || clean_(p.name) || 'website form';
  var lines = FIELDS.filter(function (k) { return clean_(p[k]); })
                    .map(function (k) { return k + ': ' + clean_(p[k]); });
  var opts = { name: 'Bapper Labs website' };
  var email = clean_(p.email);
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { opts.replyTo = email; }
  MailApp.sendEmail(TO, 'New lead: ' + who + (clean_(p.city) ? ' (' + clean_(p.city) + ')' : ''),
                    lines.join('\n'), opts);

  return reply_({ ok: true });
}

function doGet() { return reply_({ ok: true, note: 'Bapper form receiver is running.' }); }

function clean_(v) { return String(v == null ? '' : v).replace(/\s+/g, ' ').trim().slice(0, 2000); }

function reply_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
