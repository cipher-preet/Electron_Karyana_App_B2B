import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export const printInvoice = async (order: any) => {
  const element = document.createElement("div");

  element.innerHTML = `
    <div style="padding:20px; font-family:Arial; width:700px;">
      
      <!-- HEADER -->
      <div style="display:flex; justify-content:space-between; align-items:center;">
        <div>
          <h2 style="margin:0;">Your Company</h2>
          <p style="margin:2px 0;">GSTIN: 07ABCDE1234F1Z5</p>
          <p style="margin:2px 0;">Delhi, India</p>
        </div>
        <div>
          <h3>INVOICE</h3>
        </div>
      </div

      <hr />

      <!-- CUSTOMER -->
      <div style="display:flex; justify-content:space-between;">
        <div>
          <p><b>Bill To:</b></p>
          <p>${order.customer}</p>
        </div>

        <div>
          <p><b>Invoice No:</b> ${order.id}</p>
          <p><b>Date:</b> ${new Date().toLocaleDateString()}</p>
        </div>
      </div>

      <!-- TABLE -->
      <table style="width:100%; border-collapse:collapse; margin-top:20px;">
        <thead>
          <tr style="background:#f3f4f6;">
            <th style="border:1px solid #ddd; padding:8px;">Item</th>
            <th style="border:1px solid #ddd; padding:8px;">Qty</th>
            <th style="border:1px solid #ddd; padding:8px;">Price</th>
            <th style="border:1px solid #ddd; padding:8px;">Total</th>
          </tr>
        </thead>
        <tbody>
          ${order.items
            .map(
              (item: any) => `
            <tr>
              <td style="border:1px solid #ddd; padding:8px;">${item.name}</td>
              <td style="border:1px solid #ddd; padding:8px;">${item.qty}</td>
              <td style="border:1px solid #ddd; padding:8px;">₹${item.price}</td>
              <td style="border:1px solid #ddd; padding:8px;">₹${
                item.qty * item.price
              }</td>
            </tr>
          `,
            )
            .join("")}
        </tbody>
      </table>

      <!-- TOTAL -->
      <div style="margin-top:20px; text-align:right;">
        <h3>Total: ₹${order.total}</h3>
      </div>

      <!-- FOOTER -->
      <div style="margin-top:40px; text-align:center; font-size:12px; color:gray;">
        Thank you for your business!
      </div>
    </div>
  `;

  document.body.appendChild(element);

  const canvas = await html2canvas(element);
  const imgData = canvas.toDataURL("image/png");

  const pdf = new jsPDF("p", "mm", "a4");
  const imgWidth = 190;
  const pageHeight = 295;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;

  pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);

  pdf.save(`Invoice_${order.id}.pdf`);

  document.body.removeChild(element);
};
