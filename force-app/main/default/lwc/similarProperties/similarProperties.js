import { LightningElement,api,track,wire } from 'lwc';
import findProperties from '@salesforce/apex/SimilarPropertyController.findProperties';//have to specifically call out each function you wish to use

export default class similarProperties extends LightningElement {

    @api recordId;//@api = public
    @track props;//@track = private
    @track errorMsg;
			
    @wire(findProperties, { //@wire - wire/connect the findProperties results to the wiredProps function - [IMPORTANT] always use @wire with apex methods
        recordId: '$recordId',
        priceRange: '100000'
    })
    wiredProps(value) {
        this.wiredRecords = value;
        if (value.error) {
            this.errorMsg = value.error;
            console.log("ERROR: ", this.errorMsg);
        } else if (value.data) {
            this.props = value.data;
        }
    }

    //Notes:
    //Base Lightning Components (benefits - faster, easier, less maintenance): 
        //Lightning Record View Form
        //Lightning Record Edit Form
        //Lightning Record Form
    //
}