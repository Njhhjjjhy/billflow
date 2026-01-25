import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import { fontFamilies } from "./fonts";
import type { InvoiceFull, Business, Currency, Language } from "@/types";

// Initialize fonts
import "./fonts";

// ============================================
// Styles
// ============================================

const colors = {
  primary: "#5B21B6",
  black: "#111111",
  gray: "#6B7280",
  lightGray: "#E5E7EB",
  white: "#FFFFFF",
};

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: fontFamilies.body,
    fontSize: 10,
    color: colors.black,
  },
  // Header
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
    borderBottomWidth: 2,
    borderBottomColor: colors.black,
    paddingBottom: 20,
  },
  headerLeft: {
    flex: 1,
  },
  headerRight: {
    alignItems: "flex-end",
  },
  businessName: {
    fontSize: 18,
    fontFamily: fontFamilies.display,
    fontWeight: 700,
    marginBottom: 4,
  },
  invoiceTitle: {
    fontSize: 24,
    fontFamily: fontFamilies.display,
    fontWeight: 700,
    color: colors.primary,
  },
  invoiceNumber: {
    fontSize: 12,
    fontFamily: fontFamilies.mono,
    marginTop: 4,
  },
  // Info rows
  infoText: {
    fontSize: 9,
    color: colors.gray,
    marginBottom: 2,
  },
  // Billing section
  billingSection: {
    flexDirection: "row",
    marginBottom: 30,
    gap: 40,
  },
  billingBox: {
    flex: 1,
  },
  billingLabel: {
    fontSize: 8,
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: 1,
    color: colors.gray,
    marginBottom: 8,
  },
  billingName: {
    fontSize: 12,
    fontWeight: 700,
    marginBottom: 4,
  },
  billingDetail: {
    fontSize: 9,
    color: colors.gray,
    marginBottom: 2,
  },
  // Dates row
  datesRow: {
    flexDirection: "row",
    marginBottom: 20,
    backgroundColor: colors.lightGray,
    padding: 12,
    gap: 30,
  },
  dateItem: {},
  dateLabel: {
    fontSize: 8,
    color: colors.gray,
    marginBottom: 2,
  },
  dateValue: {
    fontSize: 10,
    fontWeight: 500,
  },
  // Table
  table: {
    marginBottom: 20,
    borderWidth: 2,
    borderColor: colors.black,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: colors.black,
    padding: 10,
  },
  tableHeaderText: {
    color: colors.white,
    fontSize: 8,
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
    padding: 10,
  },
  tableRowLast: {
    borderBottomWidth: 0,
  },
  colDescription: {
    flex: 3,
  },
  colQty: {
    width: 50,
    textAlign: "center",
  },
  colRate: {
    width: 80,
    textAlign: "right",
  },
  colAmount: {
    width: 80,
    textAlign: "right",
  },
  // Totals
  totalsSection: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 30,
  },
  totalsBox: {
    width: 220,
  },
  totalsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 4,
  },
  totalsLabel: {
    color: colors.gray,
  },
  totalsValue: {
    fontFamily: fontFamilies.mono,
  },
  totalsDivider: {
    borderTopWidth: 1,
    borderTopStyle: "dashed",
    borderTopColor: colors.gray,
    marginVertical: 4,
  },
  totalsFinal: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderTopWidth: 2,
    borderTopColor: colors.black,
  },
  totalsFinalLabel: {
    fontSize: 12,
    fontWeight: 700,
  },
  totalsFinalValue: {
    fontSize: 14,
    fontWeight: 700,
    fontFamily: fontFamilies.mono,
    color: colors.primary,
  },
  // Notes
  notesSection: {
    marginBottom: 30,
    padding: 16,
    backgroundColor: colors.lightGray,
  },
  notesLabel: {
    fontSize: 8,
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 8,
    color: colors.gray,
  },
  notesText: {
    fontSize: 9,
    lineHeight: 1.5,
  },
  // Footer
  footer: {
    position: "absolute",
    bottom: 40,
    left: 40,
    right: 40,
    borderTopWidth: 2,
    borderTopColor: colors.black,
    paddingTop: 12,
  },
  footerText: {
    fontSize: 8,
    color: colors.gray,
    textAlign: "center",
  },
});

// ============================================
// Labels (bilingual)
// ============================================

const labels = {
  en: {
    invoice: "INVOICE",
    billTo: "Bill To",
    billFrom: "Bill From",
    issueDate: "Issue Date",
    dueDate: "Due Date",
    description: "Description",
    qty: "Qty",
    rate: "Rate",
    amount: "Amount",
    subtotal: "Subtotal",
    discount: "Discount",
    tax: "Tax",
    total: "Total",
    notes: "Notes",
    taxId: "Tax ID",
    thankYou: "Thank you for your business!",
    paymentDue: "Payment due by",
  },
  zh: {
    invoice: "發票",
    billTo: "買受人",
    billFrom: "賣方",
    issueDate: "發票日期",
    dueDate: "付款期限",
    description: "品名",
    qty: "數量",
    rate: "單價",
    amount: "金額",
    subtotal: "小計",
    discount: "折扣",
    tax: "營業稅",
    total: "總計",
    notes: "備註",
    taxId: "統一編號",
    thankYou: "感謝您的惠顧！",
    paymentDue: "請於此日期前付款",
  },
};

// ============================================
// Formatters
// ============================================

function formatCurrency(amount: number, currency: Currency): string {
  const config: Record<Currency, { symbol: string; decimals: number; locale: string }> = {
    TWD: { symbol: "NT$", decimals: 0, locale: "zh-TW" },
    USD: { symbol: "$", decimals: 2, locale: "en-US" },
    EUR: { symbol: "€", decimals: 2, locale: "de-DE" },
  };

  const { symbol, decimals, locale } = config[currency];
  const formatted = new Intl.NumberFormat(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(amount);

  return `${symbol}${formatted}`;
}

function formatDate(date: Date | string, language: Language): string {
  const d = typeof date === "string" ? new Date(date) : date;

  if (language === "zh") {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}/${month}/${day}`;
  }

  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

// ============================================
// Props
// ============================================

interface InvoicePDFProps {
  invoice: InvoiceFull;
  business: Business;
}

// ============================================
// Component
// ============================================

export function InvoicePDF({ invoice, business }: InvoicePDFProps) {
  const lang = invoice.language;
  const t = labels[lang];

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.businessName}>
              {lang === "zh" ? business.name_zh : (business.name_en || business.name_zh)}
            </Text>
            {business.tax_id && (
              <Text style={styles.infoText}>{t.taxId}: {business.tax_id}</Text>
            )}
            {business.address && (
              <Text style={styles.infoText}>{business.address}</Text>
            )}
            {business.phone && (
              <Text style={styles.infoText}>{business.phone}</Text>
            )}
            <Text style={styles.infoText}>{business.email}</Text>
          </View>
          <View style={styles.headerRight}>
            <Text style={styles.invoiceTitle}>{t.invoice}</Text>
            <Text style={styles.invoiceNumber}>{invoice.invoice_number}</Text>
          </View>
        </View>

        {/* Billing Section */}
        <View style={styles.billingSection}>
          <View style={styles.billingBox}>
            <Text style={styles.billingLabel}>{t.billTo}</Text>
            <Text style={styles.billingName}>{invoice.client.display_name}</Text>
            {invoice.client.company_name && (
              <Text style={styles.billingDetail}>{invoice.client.company_name}</Text>
            )}
            {invoice.client.tax_id && (
              <Text style={styles.billingDetail}>{t.taxId}: {invoice.client.tax_id}</Text>
            )}
            {invoice.client.address && (
              <Text style={styles.billingDetail}>
                {invoice.client.address}
                {invoice.client.city && `, ${invoice.client.city}`}
                {invoice.client.postal_code && ` ${invoice.client.postal_code}`}
              </Text>
            )}
            <Text style={styles.billingDetail}>{invoice.client.email}</Text>
          </View>
        </View>

        {/* Dates Row */}
        <View style={styles.datesRow}>
          <View style={styles.dateItem}>
            <Text style={styles.dateLabel}>{t.issueDate}</Text>
            <Text style={styles.dateValue}>{formatDate(invoice.issue_date, lang)}</Text>
          </View>
          <View style={styles.dateItem}>
            <Text style={styles.dateLabel}>{t.dueDate}</Text>
            <Text style={styles.dateValue}>{formatDate(invoice.due_date, lang)}</Text>
          </View>
        </View>

        {/* Line Items Table */}
        <View style={styles.table}>
          {/* Table Header */}
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderText, styles.colDescription]}>{t.description}</Text>
            <Text style={[styles.tableHeaderText, styles.colQty]}>{t.qty}</Text>
            <Text style={[styles.tableHeaderText, styles.colRate]}>{t.rate}</Text>
            <Text style={[styles.tableHeaderText, styles.colAmount]}>{t.amount}</Text>
          </View>

          {/* Table Rows */}
          {invoice.items.map((item, index) => {
            const isLast = index === invoice.items.length - 1;
            return (
              <View
                key={item.id}
                style={isLast ? [styles.tableRow, styles.tableRowLast] : styles.tableRow}
              >
                <Text style={styles.colDescription}>{item.description}</Text>
                <Text style={styles.colQty}>{item.quantity}</Text>
                <Text style={styles.colRate}>
                  {formatCurrency(item.unit_price, invoice.currency)}
                </Text>
                <Text style={styles.colAmount}>
                  {formatCurrency(item.amount, invoice.currency)}
                </Text>
              </View>
            );
          })}
        </View>

        {/* Totals */}
        <View style={styles.totalsSection}>
          <View style={styles.totalsBox}>
            <View style={styles.totalsRow}>
              <Text style={styles.totalsLabel}>{t.subtotal}</Text>
              <Text style={styles.totalsValue}>
                {formatCurrency(invoice.subtotal, invoice.currency)}
              </Text>
            </View>

            {invoice.discount_amount > 0 && (
              <View style={styles.totalsRow}>
                <Text style={styles.totalsLabel}>{t.discount}</Text>
                <Text style={styles.totalsValue}>
                  -{formatCurrency(invoice.discount_amount, invoice.currency)}
                </Text>
              </View>
            )}

            <View style={styles.totalsRow}>
              <Text style={styles.totalsLabel}>
                {t.tax} ({(invoice.tax_rate * 100).toFixed(0)}%)
              </Text>
              <Text style={styles.totalsValue}>
                {formatCurrency(invoice.tax_amount, invoice.currency)}
              </Text>
            </View>

            <View style={styles.totalsDivider} />

            <View style={styles.totalsFinal}>
              <Text style={styles.totalsFinalLabel}>{t.total}</Text>
              <Text style={styles.totalsFinalValue}>
                {formatCurrency(invoice.total, invoice.currency)}
              </Text>
            </View>
          </View>
        </View>

        {/* Notes */}
        {invoice.notes_external && (
          <View style={styles.notesSection}>
            <Text style={styles.notesLabel}>{t.notes}</Text>
            <Text style={styles.notesText}>{invoice.notes_external}</Text>
          </View>
        )}

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            {t.thankYou} • {t.paymentDue} {formatDate(invoice.due_date, lang)}
          </Text>
        </View>
      </Page>
    </Document>
  );
}
