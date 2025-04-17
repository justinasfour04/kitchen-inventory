export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      categories: {
        Row: {
          created_at: string | null;
          id: number;
          name: string;
          updated_at: string | null;
        };
        Insert: {
          created_at?: string | null;
          id?: number;
          name: string;
          updated_at?: string | null;
        };
        Update: {
          created_at?: string | null;
          id?: number;
          name?: string;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      inventory_transactions: {
        Row: {
          id: number;
          item_id: number | null;
          notes: string | null;
          quantity: number;
          transaction_date: string | null;
          transaction_type: string;
        };
        Insert: {
          id?: number;
          item_id?: number | null;
          notes?: string | null;
          quantity: number;
          transaction_date?: string | null;
          transaction_type: string;
        };
        Update: {
          id?: number;
          item_id?: number | null;
          notes?: string | null;
          quantity?: number;
          transaction_date?: string | null;
          transaction_type?: string;
        };
        Relationships: [
          {
            foreignKeyName: "inventory_transactions_item_id_fkey";
            columns: ["item_id"];
            isOneToOne: false;
            referencedRelation: "items";
            referencedColumns: ["id"];
          },
        ];
      };
      items: {
        Row: {
          barcode: string;
          category_id: number;
          created_at: string | null;
          expiration_date: string;
          id: number;
          image: string | null;
          minimum_quantity: number;
          name: string;
          quantity: number;
          shelf_id: number;
          unit: string;
          updated_at: string | null;
        };
        Insert: {
          barcode: string;
          category_id: number;
          created_at?: string | null;
          expiration_date: string;
          id?: number;
          image?: string | null;
          minimum_quantity?: number;
          name: string;
          quantity?: number;
          shelf_id: number;
          unit: string;
          updated_at?: string | null;
        };
        Update: {
          barcode?: string;
          category_id?: number;
          created_at?: string | null;
          expiration_date?: string;
          id?: number;
          image?: string | null;
          minimum_quantity?: number;
          name?: string;
          quantity?: number;
          shelf_id?: number;
          unit?: string;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "items_category_id_fkey";
            columns: ["category_id"];
            isOneToOne: false;
            referencedRelation: "categories";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "items_shelf_id_fkey";
            columns: ["shelf_id"];
            isOneToOne: false;
            referencedRelation: "shelves";
            referencedColumns: ["id"];
          },
        ];
      };
      shelves: {
        Row: {
          created_at: string | null;
          id: number;
          name: string;
          updated_at: string | null;
        };
        Insert: {
          created_at?: string | null;
          id?: number;
          name: string;
          updated_at?: string | null;
        };
        Update: {
          created_at?: string | null;
          id?: number;
          name?: string;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      shopping_list: {
        Row: {
          added_at: string | null;
          id: number;
          item_id: number | null;
          priority: string | null;
          purchased: boolean | null;
          quantity: number;
        };
        Insert: {
          added_at?: string | null;
          id?: number;
          item_id?: number | null;
          priority?: string | null;
          purchased?: boolean | null;
          quantity: number;
        };
        Update: {
          added_at?: string | null;
          id?: number;
          item_id?: number | null;
          priority?: string | null;
          purchased?: boolean | null;
          quantity?: number;
        };
        Relationships: [
          {
            foreignKeyName: "shopping_list_item_id_fkey";
            columns: ["item_id"];
            isOneToOne: false;
            referencedRelation: "items";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DefaultSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  } ? keyof (
      & Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
      & Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"]
    )
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database } ? (
    & Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    & Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"]
  )[TableName] extends {
    Row: infer R;
  } ? R
  : never
  : DefaultSchemaTableNameOrOptions extends keyof (
    & DefaultSchema["Tables"]
    & DefaultSchema["Views"]
  ) ? (
      & DefaultSchema["Tables"]
      & DefaultSchema["Views"]
    )[DefaultSchemaTableNameOrOptions] extends {
      Row: infer R;
    } ? R
    : never
  : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  } ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][
    TableName
  ] extends {
    Insert: infer I;
  } ? I
  : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
      Insert: infer I;
    } ? I
    : never
  : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  } ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][
    TableName
  ] extends {
    Update: infer U;
  } ? U
  : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
      Update: infer U;
    } ? U
    : never
  : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database;
  } ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
  : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  } ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]][
      "CompositeTypes"
    ]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][
    CompositeTypeName
  ]
  : PublicCompositeTypeNameOrOptions extends
    keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
  : never;

export const Constants = {
  public: {
    Enums: {},
  },
} as const;
