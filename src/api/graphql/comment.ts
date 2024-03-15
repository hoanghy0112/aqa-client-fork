import { graphql } from "../../gql";

export const getCommentQuantity = graphql(`
	query CommentQuantity($type: String!) {
		commentQuantity(type: $type) {
			quantity
			type
		}
	}
`);
