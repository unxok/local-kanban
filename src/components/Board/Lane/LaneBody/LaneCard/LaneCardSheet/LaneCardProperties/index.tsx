import { CardProps } from "@/components/CardsProvider";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

export const LaneCardProperties = (props: {
  properties: CardProps["properties"];
  cardId: string;
}) => {
  if (!props.properties) {
    return null;
  }
  const colHeaders = Object.keys(props.properties);
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Property</TableHead>
          <TableHead>Value</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {colHeaders.map((h) => (
          <TableRow key={props.cardId + h + "-sheet-property-row"}>
            <TableCell>{h}</TableCell>
            <TableCell>{props.properties && props.properties[h]}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
