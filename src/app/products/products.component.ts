import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DailogComponent } from '../dailog/dailog.component';
import { jsPDF } from 'jspdf';
// import html2canvas from 'html2canvas';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  data: any = [
  { img: "https://cms.cloudinary.vpsvc.com//image/fetch/q_auto:eco,w_700,f_auto,dpr_auto/https://s3-eu-west-1.amazonaws.com/sitecore-media-bucket/prod%2Fen%2F%7B41ED0F83-1DC4-4568-B273-4DBCCE756419%7D", details: 'Men’s Office Shirts - Half Sleeve,Look professional with Mens office Shirts and get a boost to your confidence', rate: 500 },
  { img: "https://cms.cloudinary.vpsvc.com//image/fetch/q_auto:eco,w_700,f_auto,dpr_auto/https://s3-eu-west-1.amazonaws.com/sitecore-media-bucket/prod%2fen-IN%2f%7b5225D19B-CE72-4EF3-94E2-4EC20DF509C8%7d%3fv%3db0c2459675168e137b26c1e2ee4e92ec", details: 'Look professional with Mens office Shirts and get a boost to your confidence', rate: 800 },
  { img: "https://cms.cloudinary.vpsvc.com//image/fetch/q_auto:eco,w_700,f_auto,dpr_auto/https://s3-eu-west-1.amazonaws.com/sitecore-media-bucket/prod%2Fen%2F%7B41ED0F83-1DC4-4568-B273-4DBCCE756419%7D", details: 'Look smart in your office with half-sleeve office shirts for men. Our office shirts come with a wrinkle-free finish and stain-proof technology. ', rate: 680 },
  { img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwWTEXHN22yVqAZJmf1S6Zro01Q91Qvjv4ZXqouPEFw3PJPr50Tongdcd_jPAxAE7nLNo&usqp=CAU", details: 'Men’s Office Shirts - Half Sleeve', rate: 3000 },
  { img: "https://cms.cloudinary.vpsvc.com//image/fetch/q_auto:eco,w_700,f_auto,dpr_auto/https://s3-eu-west-1.amazonaws.com/sitecore-media-bucket/prod%2Fen%2F%7B41ED0F83-1DC4-4568-B273-4DBCCE756419%7D", details: 'Men’s Office Shirts - Half Sleeve,Our office shirts come with a wrinkle-free finish and stain-proof technology. ', rate: 350 },
  { img: "https://the-collective.imgix.net/img/app/product/6/665738-6845697.jpg?w=1600&auto=format,compress,enhance", details: 'Men’s Office Shirts - Half Sleeve', rate: 670 },
  { img: "https://cms.cloudinary.vpsvc.com//image/fetch/q_auto:eco,w_700,f_auto,dpr_auto/https://s3-eu-west-1.amazonaws.com/sitecore-media-bucket/prod%2Fen%2F%7B41ED0F83-1DC4-4568-B273-4DBCCE756419%7D", details: 'Men’s Office Shirts - Half Sleeve,Look professional with Mens office Shirts and get a boost to your confidence', rate: 870 },
  { img: "https://cms.cloudinary.vpsvc.com//image/fetch/q_auto:eco,w_700,f_auto,dpr_auto/https://s3-eu-west-1.amazonaws.com/sitecore-media-bucket/prod%2fen-IN%2f%7b5225D19B-CE72-4EF3-94E2-4EC20DF509C8%7d%3fv%3db0c2459675168e137b26c1e2ee4e92ec", details: 'Look professional with Mens office Shirts and get a boost to your confidence', rate: 420 },
  { img: "https://cms.cloudinary.vpsvc.com//image/fetch/q_auto:eco,w_700,f_auto,dpr_auto/https://s3-eu-west-1.amazonaws.com/sitecore-media-bucket/prod%2Fen%2F%7B41ED0F83-1DC4-4568-B273-4DBCCE756419%7D", details: 'Look smart in your office with half-sleeve office shirts for men. Our office shirts come with a wrinkle-free finish and stain-proof technology. ', rate: 780 },
  { img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwWTEXHN22yVqAZJmf1S6Zro01Q91Qvjv4ZXqouPEFw3PJPr50Tongdcd_jPAxAE7nLNo&usqp=CAU", details: 'Men’s Office Shirts - Half Sleeve', rate: 1500 },
  { img: "https://cms.cloudinary.vpsvc.com//image/fetch/q_auto:eco,w_700,f_auto,dpr_auto/https://s3-eu-west-1.amazonaws.com/sitecore-media-bucket/prod%2Fen%2F%7B41ED0F83-1DC4-4568-B273-4DBCCE756419%7D", details: 'Men’s Office Shirts - Half Sleeve,Our office shirts come with a wrinkle-free finish and stain-proof technology. ', rate: 350 },
  { img: "https://the-collective.imgix.net/img/app/product/6/665738-6845697.jpg?w=1600&auto=format,compress,enhance", details: 'Men’s Office Shirts - Half Sleeve', rate: 950 },
  ];
  selectedProduct: any = [];
  isCart: boolean = false;
  count: any = 1;
  itemCount: any = 0;
  message: any = 'product added';
  countValue: any = [];
  selecetedAmountPush: any = [];
  countAmount: any = [];

  constructor(private http: HttpClient, private snackBar: MatSnackBar, private matDialog: MatDialog) { }
  @ViewChild('pdfTable', { static: false })
  pdfTable!: ElementRef;

  ngOnInit(): void {
    this.http.post('https://drcmart.in/admin_panel/api-firebase/get-all-products-for-api.php', {}).subscribe((res: any) => {
      // console.log('res', res)
    })
  }
  addProduct(idx: number) {
    this.selecetedAmountPush.push(this.data[idx].rate)
    this.selectedProduct.push(this.data[idx]);
    this.snackBar.open(this.message, '', { duration: 500, });

  }
  productDetails() {
    this.isCart = true;
    this.selectedProduct.forEach((data: any) => {
      this.itemCount += data.rate;
      this.countValue.push(1);
      this.countAmount.push(data.rate);
    });
  }
  deCrease(idx: number) {
    if (this.countValue[idx] > 1) {
      this.count--;
      let a = this.countValue[idx];
      a--;
      this.countValue[idx] = a;
      this.countValue[idx] = this.countValue[idx]--;
      this.itemCount = this.itemCount - this.selectedProduct[idx].rate;
    }
    let c = this.selectedProduct[idx].rate / this.countValue[idx]
    this.countAmount[idx] = c;
  }

  inCrease(idx: number) {
    this.count++;
    let a = this.countValue[idx];
    a++;
    this.countValue[idx] = a;
    if (this.count == 1) {
      this.itemCount += this.selecetedAmountPush.forEach((data: any) => {
        data += data
      })
    }
    else if (this.count > 1) {
      this.itemCount += this.selectedProduct[idx].rate;
    }
    let c = this.selectedProduct[idx].rate * this.countValue[idx]
    this.countAmount[idx] = c;
  }

  async inVoice() {
    const specialElementHandlers = {
      '#editor': function (element: any, renderer: any) {
        return true;
      }
    };
    const pdfTable = this.pdfTable.nativeElement;
    const doc = new jsPDF('p', 'pt', 'a4');
    const div = pdfTable
    await doc.html(div);
    doc.save('invoice.pdf');
    doc.output('dataurlnewwindow');
  }

  delete(index: number) {
    const dialogRef = this.matDialog.open(DailogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.itemCount -= this.countAmount[index]
        this.selectedProduct.splice(index, 1);
        this.countValue.splice(index, 1);
        this.countAmount.splice(index, 1);
      }
    });
  }
}

