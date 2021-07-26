import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

export interface IHomeRemedy {
  name: string;
  remedies: string[];
  medicine: string[];
}

@Component({
  selector: 'app-remedies',
  templateUrl: './remedies.page.html',
  styleUrls: ['./remedies.page.scss'],
})
export class RemediesPage implements OnInit {
  homeRemedies: IHomeRemedy[] = [
    { name: "Scabies", remedies: ["Tea tree oil", "Neem", "Aloe vera", "Cayenne pepper", "Clove oil"], medicine: ["Ivermectin", "Permethrin"] },
    { name: "Chickenpox", remedies: ["Apply calamine lotion", "Serve sugar-free popsicles", "Bathe in oatmeal", "Wear mittens to prevent scratching", "Take baking soda baths"], medicine: ["Any type of approved Pain reliver", "DO NOT USE ANY ASPRIN PRODUCTS"] },
    { name: "Eczema", remedies: ["Drink Lot's of water", "Apple cider vinegar", "Bleach in the bath", "Colloidal oatmeal", "Coconut oil"], medicine: ["Antihistimine (Allergey Medicine)", "Topical Antiseptic"] },
    { name: "Measles", remedies: ["Rest your eyes", "Seek respiratory relief. Use a humidifier to relieve a cough and sore throat.", "rest"], medicine: ["Analgesic"] },
    { name: "Acne", remedies: ["Apply Apple Cider Vinegar", "Take a Zinc Supplement", "Make a Honey and Cinnamon Mask", "Spot Treat With Tea Tree Oil", "Apply Green Tea to Your Skin"], medicine: ["Anti-inflammatory", "Vitamin A derivative", "Topical antiseptic"] },
    { name: "Athlete's foot", remedies: ["Tea tree oil", "Garlic", "Hydrogen peroxide with iodinek", "Hair dryer and talcum powder", "Baking soda"], medicine: ["Antifungul medication"] },
    { name: "Impetigo", remedies: ["Aloe vera", "Chamomile", "Garlic", "Ginger", "Neem"], medicine: ["Penicillin"] },
    { name: "Fifth Disease", remedies: ["Just Monitor the diesease, it will pass on its own"], medicine: ["Acetaminophen avoid asprin", "Anagelsic"] },
  ];

  selectedRemedies: IHomeRemedy;
  diseaseName: string;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.diseaseName = this.route.snapshot.params["disease"];
    this.selectedRemedies = this.homeRemedies.find(h => h.name == this.diseaseName);
  }

}