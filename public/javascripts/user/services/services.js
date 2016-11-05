jobPortal.service("notificationMessage",function(Notification){

              /*this.primary = function() {
                Notification('Successfully ! item is added to cart');
              };*/
                this.error = function() {
                    Notification.error('Error ! Something went Wrong.');
                };
                this.success = function() {
                    Notification.success('Successfully ! log in');
                };
                this.reset = function() {
                    Notification.success('Successfully ! Password updated');
                };
                this.logout = function() {
                    Notification.success('You Are ! Logout');
                };
                this.info = function() {
                    Notification.info(' Mail successfully sent to your EmailId ');
                };
                this.mail = function() {
                    Notification.info(' Mail successfully sent ');
                };
                this.reg = function() {
                    Notification.info(' You  are register successfully !! ');
                };
                this.post = function() {
                    Notification.error(' Your review post successfully');
                };
                this.logIn = function() {
                    Notification.error(' You Need To Login First');
                };
                this.inValid = function() {
                    Notification.warning('Incorrect Email address Or Password ');
                }
                /* this.checkoutSuccess = function() {
                    Notification({message: 'Succefully...! cart to checkout', title: 'CheckOut'});
                };
                 this.checkoutError = function() {
                    Notification.error('Error to cart checkout ');
                };
              this.successAddProduct = function() {
                    Notification.success('Successfully ! Add new Product');
                };
                this.info = function() {
                    Notification.info('Successfully ! signup plz varify your email and login ');
                };
                this.ProductErrorwarning = function() {
                    Notification.warning('Error...! Product is not add ');
                };
                this.shippingErrorwarning = function() {
                    Notification.warning('Error...! Shipping info not add ');
                };
                 this.BillingErrorwarning = function() {
                    Notification.warning('Error...! Billing info not add');
                };
               this.primaryshipping = function() {
                    Notification({message: 'Succefully...! Add shipping address', title: 'Shipping detail'});
                };
             this.primaryBilling= function() {
                    Notification({message: 'Succefully...! Add Billing Detail', title: 'Billing detail'});
                };
          
                this.errorTime = function() {
                    Notification.error({message: 'Error to login ', delay: 1500});
                };
                this.errorNoTime = function() {
                    Notification.error({message: 'Error notification (no timeout)', delay: null});
                };
                this.successTime = function() {
                    Notification.success({message: 'Success notification 20s', delay: 20000});
                };

                this.errorHtml = function() {
                    Notification.error({message: '<b>Error</b> <s>To save order</s>'});
                };*/

                
});