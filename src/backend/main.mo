import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";
import Time "mo:base/Time";
import Array "mo:base/Array";

actor {
  stable let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  public type ContactMessage = {
    id : Nat;
    name : Text;
    email : Text;
    subject : Text;
    message : Text;
    timestamp : Int;
  };

  stable var messages : [ContactMessage] = [];
  stable var nextId : Nat = 0;

  public func submitContactMessage(name : Text, email : Text, subject : Text, message : Text) : async Nat {
    let id = nextId;
    nextId += 1;
    let msg : ContactMessage = {
      id;
      name;
      email;
      subject;
      message;
      timestamp = Time.now();
    };
    messages := Array.append(messages, [msg]);
    id
  };

  public query ({ caller }) func getContactMessages() : async [ContactMessage] {
    assert AccessControl.isAdmin(accessControlState, caller);
    messages
  };
}
