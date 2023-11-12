import * as keystone from "keystone";
import * as _ from "lodash";
const Enquiry = keystone.list("Enquiry");

export async function contact(req, res) {
	const newEnquiry = new Enquiry.model();
	const updater = newEnquiry.getUpdateHandler(req);
	const messages = { errors: [], notices: [] };
	let success = false;
	const CONTACT_SUCCESS_MESSAGE =
		"Thank you, we will get back to you shortly!";

	updater.process(
		req.body,
		{
			fields: "name, email, reason, message, phone, organisation",
		},
		function (errors) {
			if (errors) {
				_.forEach(errors.detail, (err) => {
					messages.errors.push(err.error);
				});
			} else {
				success = true;
				messages.notices.push(CONTACT_SUCCESS_MESSAGE);
			}
			res.json({ messages, success });
		}
	);
}

export async function getContactReasons(req, res) {
	res.json(Enquiry.fields.reason.ops);
}
