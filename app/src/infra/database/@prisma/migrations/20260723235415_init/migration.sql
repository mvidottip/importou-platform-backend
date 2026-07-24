-- CreateTable
CREATE TABLE "user" (
    "user_id" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL,
    "status" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "is_blocked" BOOLEAN NOT NULL,
    "blocked_reason" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "activated_at" TIMESTAMP(3),
    "deactivated_at" TIMESTAMP(3)
);

-- CreateTable
CREATE TABLE "person" (
    "person_id" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL,
    "status" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cpf" TEXT,
    "birthdate" TIMESTAMP(3),
    "nationality" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deactivated_at" TIMESTAMP(3),
    "user_id" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "organization" (
    "organization_id" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL,
    "type" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "legal_name" TEXT NOT NULL,
    "tax_id" TEXT,
    "foreign_tax_id" TEXT,
    "license_number" TEXT,
    "radar_status" TEXT,
    "radar_type" TEXT,
    "radar_checked_at" TIMESTAMP(3),
    "country" TEXT,
    "city" TEXT,
    "notes" TEXT,
    "metadata" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "submitted_at" TIMESTAMP(3),
    "approved_at" TIMESTAMP(3),
    "rejected_at" TIMESTAMP(3),
    "deactivated_at" TIMESTAMP(3)
);

-- CreateTable
CREATE TABLE "role" (
    "role_id" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL,
    "status" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "activated_at" TIMESTAMP(3),
    "deactivated_at" TIMESTAMP(3)
);

-- CreateTable
CREATE TABLE "membership" (
    "membership_id" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL,
    "status" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deactivated_at" TIMESTAMP(3),
    "user_id" TEXT NOT NULL,
    "organization_id" TEXT NOT NULL,
    "role_id" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "organization_compliance_review" (
    "organization_compliance_review_id" TEXT NOT NULL,
    "decision" TEXT NOT NULL,
    "note" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL,
    "organization_id" TEXT NOT NULL,
    "reviewer_user_id" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "contact" (
    "contact_id" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL,
    "status" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "parent_type" TEXT NOT NULL,
    "parent_id" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deactivated_at" TIMESTAMP(3)
);

-- CreateTable
CREATE TABLE "address" (
    "address_id" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL,
    "status" TEXT NOT NULL,
    "parent_type" TEXT NOT NULL,
    "parent_id" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "complement" TEXT,
    "neighborhood" TEXT,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "zip_code" TEXT NOT NULL,
    "country" TEXT NOT NULL DEFAULT 'BR',
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deactivated_at" TIMESTAMP(3)
);

-- CreateTable
CREATE TABLE "document" (
    "document_id" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL,
    "status" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "parent_type" TEXT NOT NULL,
    "parent_id" TEXT NOT NULL,
    "number" TEXT,
    "file_key" TEXT,
    "file_name" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deactivated_at" TIMESTAMP(3)
);

-- CreateTable
CREATE TABLE "file" (
    "file_id" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL,
    "status" TEXT NOT NULL,
    "parent_type" TEXT NOT NULL,
    "parent_id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "mime_type" TEXT NOT NULL,
    "size_bytes" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deactivated_at" TIMESTAMP(3)
);

-- CreateTable
CREATE TABLE "import_operation" (
    "import_operation_id" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL,
    "status" TEXT NOT NULL,
    "reference_code" TEXT NOT NULL,
    "product_name" TEXT NOT NULL,
    "product_id" TEXT,
    "quantity" INTEGER NOT NULL,
    "incoterm" TEXT,
    "origin_country" TEXT,
    "origin_city" TEXT,
    "port" TEXT,
    "estimated_value" INTEGER,
    "estimated_currency" TEXT NOT NULL DEFAULT 'USD',
    "requested_at" TIMESTAMP(3) NOT NULL,
    "quote_locked_at" TIMESTAMP(3),
    "completed_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deactivated_at" TIMESTAMP(3),
    "importer_organization_id" TEXT NOT NULL,
    "exporter_organization_id" TEXT,
    "broker_organization_id" TEXT
);

-- CreateTable
CREATE TABLE "exporter_quote" (
    "exporter_quote_id" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL,
    "status" TEXT NOT NULL,
    "invoice_number" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "unit_price" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "incoterm" TEXT NOT NULL,
    "valid_until" TIMESTAMP(3) NOT NULL,
    "notes" TEXT,
    "submitted_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deactivated_at" TIMESTAMP(3),
    "import_operation_id" TEXT NOT NULL,
    "exporter_organization_id" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "landed_cost_estimate" (
    "landed_cost_estimate_id" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL,
    "status" TEXT NOT NULL,
    "product_amount_usd" INTEGER NOT NULL,
    "fx_rate" DECIMAL(12,6) NOT NULL,
    "product_amount_brl" INTEGER NOT NULL,
    "total_amount_brl" INTEGER NOT NULL,
    "lines" JSONB NOT NULL,
    "estimated_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "import_operation_id" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "broker_proposal" (
    "broker_proposal_id" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL,
    "status" TEXT NOT NULL,
    "clearance_fee_brl" INTEGER NOT NULL,
    "handling_fee_brl" INTEGER NOT NULL,
    "valid_until" TIMESTAMP(3) NOT NULL,
    "notes" TEXT,
    "submitted_at" TIMESTAMP(3),
    "decided_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deactivated_at" TIMESTAMP(3),
    "import_operation_id" TEXT NOT NULL,
    "broker_organization_id" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "audit" (
    "audit_id" TEXT NOT NULL,
    "entity_id" TEXT NOT NULL,
    "command_name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "method" TEXT NOT NULL,
    "requester_id" TEXT NOT NULL,
    "requester_ip" TEXT NOT NULL,
    "requester_agent" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL,
    "organization_id" TEXT
);

-- CreateTable
CREATE TABLE "idempotency" (
    "idempotency_id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL,
    "parent_id" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "user_user_id_key" ON "user"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "person_person_id_key" ON "person"("person_id");

-- CreateIndex
CREATE UNIQUE INDEX "person_cpf_key" ON "person"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "person_user_id_key" ON "person"("user_id");

-- CreateIndex
CREATE INDEX "person_user_id_idx" ON "person"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "organization_organization_id_key" ON "organization"("organization_id");

-- CreateIndex
CREATE INDEX "organization_type_idx" ON "organization"("type");

-- CreateIndex
CREATE INDEX "organization_status_idx" ON "organization"("status");

-- CreateIndex
CREATE INDEX "organization_radar_status_idx" ON "organization"("radar_status");

-- CreateIndex
CREATE UNIQUE INDEX "organization_type_tax_id_key" ON "organization"("type", "tax_id");

-- CreateIndex
CREATE UNIQUE INDEX "role_role_id_key" ON "role"("role_id");

-- CreateIndex
CREATE UNIQUE INDEX "role_type_key" ON "role"("type");

-- CreateIndex
CREATE UNIQUE INDEX "membership_membership_id_key" ON "membership"("membership_id");

-- CreateIndex
CREATE INDEX "membership_user_id_idx" ON "membership"("user_id");

-- CreateIndex
CREATE INDEX "membership_organization_id_idx" ON "membership"("organization_id");

-- CreateIndex
CREATE INDEX "membership_role_id_idx" ON "membership"("role_id");

-- CreateIndex
CREATE UNIQUE INDEX "membership_user_id_organization_id_key" ON "membership"("user_id", "organization_id");

-- CreateIndex
CREATE UNIQUE INDEX "organization_compliance_review_organization_compliance_revi_key" ON "organization_compliance_review"("organization_compliance_review_id");

-- CreateIndex
CREATE INDEX "organization_compliance_review_organization_id_idx" ON "organization_compliance_review"("organization_id");

-- CreateIndex
CREATE INDEX "organization_compliance_review_reviewer_user_id_idx" ON "organization_compliance_review"("reviewer_user_id");

-- CreateIndex
CREATE UNIQUE INDEX "contact_contact_id_key" ON "contact"("contact_id");

-- CreateIndex
CREATE INDEX "contact_parent_id_idx" ON "contact"("parent_id");

-- CreateIndex
CREATE INDEX "contact_parent_type_parent_id_idx" ON "contact"("parent_type", "parent_id");

-- CreateIndex
CREATE UNIQUE INDEX "address_address_id_key" ON "address"("address_id");

-- CreateIndex
CREATE INDEX "address_parent_id_idx" ON "address"("parent_id");

-- CreateIndex
CREATE INDEX "address_parent_type_parent_id_idx" ON "address"("parent_type", "parent_id");

-- CreateIndex
CREATE UNIQUE INDEX "document_document_id_key" ON "document"("document_id");

-- CreateIndex
CREATE INDEX "document_parent_id_idx" ON "document"("parent_id");

-- CreateIndex
CREATE INDEX "document_parent_type_parent_id_idx" ON "document"("parent_type", "parent_id");

-- CreateIndex
CREATE UNIQUE INDEX "file_file_id_key" ON "file"("file_id");

-- CreateIndex
CREATE INDEX "file_parent_id_idx" ON "file"("parent_id");

-- CreateIndex
CREATE INDEX "file_parent_type_parent_id_idx" ON "file"("parent_type", "parent_id");

-- CreateIndex
CREATE UNIQUE INDEX "import_operation_import_operation_id_key" ON "import_operation"("import_operation_id");

-- CreateIndex
CREATE UNIQUE INDEX "import_operation_reference_code_key" ON "import_operation"("reference_code");

-- CreateIndex
CREATE INDEX "import_operation_status_idx" ON "import_operation"("status");

-- CreateIndex
CREATE INDEX "import_operation_importer_organization_id_idx" ON "import_operation"("importer_organization_id");

-- CreateIndex
CREATE INDEX "import_operation_exporter_organization_id_idx" ON "import_operation"("exporter_organization_id");

-- CreateIndex
CREATE INDEX "import_operation_broker_organization_id_idx" ON "import_operation"("broker_organization_id");

-- CreateIndex
CREATE UNIQUE INDEX "exporter_quote_exporter_quote_id_key" ON "exporter_quote"("exporter_quote_id");

-- CreateIndex
CREATE INDEX "exporter_quote_import_operation_id_idx" ON "exporter_quote"("import_operation_id");

-- CreateIndex
CREATE INDEX "exporter_quote_exporter_organization_id_idx" ON "exporter_quote"("exporter_organization_id");

-- CreateIndex
CREATE INDEX "exporter_quote_status_idx" ON "exporter_quote"("status");

-- CreateIndex
CREATE UNIQUE INDEX "landed_cost_estimate_landed_cost_estimate_id_key" ON "landed_cost_estimate"("landed_cost_estimate_id");

-- CreateIndex
CREATE INDEX "landed_cost_estimate_import_operation_id_idx" ON "landed_cost_estimate"("import_operation_id");

-- CreateIndex
CREATE UNIQUE INDEX "broker_proposal_broker_proposal_id_key" ON "broker_proposal"("broker_proposal_id");

-- CreateIndex
CREATE INDEX "broker_proposal_import_operation_id_idx" ON "broker_proposal"("import_operation_id");

-- CreateIndex
CREATE INDEX "broker_proposal_broker_organization_id_idx" ON "broker_proposal"("broker_organization_id");

-- CreateIndex
CREATE INDEX "broker_proposal_status_idx" ON "broker_proposal"("status");

-- CreateIndex
CREATE UNIQUE INDEX "audit_audit_id_key" ON "audit"("audit_id");

-- CreateIndex
CREATE INDEX "audit_entity_id_idx" ON "audit"("entity_id");

-- CreateIndex
CREATE INDEX "audit_command_name_idx" ON "audit"("command_name");

-- CreateIndex
CREATE INDEX "audit_requester_id_idx" ON "audit"("requester_id");

-- CreateIndex
CREATE INDEX "audit_organization_id_idx" ON "audit"("organization_id");

-- CreateIndex
CREATE UNIQUE INDEX "idempotency_idempotency_id_key" ON "idempotency"("idempotency_id");

-- CreateIndex
CREATE INDEX "idempotency_key_idx" ON "idempotency"("key");

-- CreateIndex
CREATE INDEX "idempotency_parent_id_idx" ON "idempotency"("parent_id");

-- CreateIndex
CREATE UNIQUE INDEX "idempotency_key_parent_id_key" ON "idempotency"("key", "parent_id");

-- AddForeignKey
ALTER TABLE "person" ADD CONSTRAINT "person_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "membership" ADD CONSTRAINT "membership_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "membership" ADD CONSTRAINT "membership_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organization"("organization_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "membership" ADD CONSTRAINT "membership_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "role"("role_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organization_compliance_review" ADD CONSTRAINT "organization_compliance_review_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organization"("organization_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "import_operation" ADD CONSTRAINT "import_operation_importer_organization_id_fkey" FOREIGN KEY ("importer_organization_id") REFERENCES "organization"("organization_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "import_operation" ADD CONSTRAINT "import_operation_exporter_organization_id_fkey" FOREIGN KEY ("exporter_organization_id") REFERENCES "organization"("organization_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "import_operation" ADD CONSTRAINT "import_operation_broker_organization_id_fkey" FOREIGN KEY ("broker_organization_id") REFERENCES "organization"("organization_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exporter_quote" ADD CONSTRAINT "exporter_quote_import_operation_id_fkey" FOREIGN KEY ("import_operation_id") REFERENCES "import_operation"("import_operation_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exporter_quote" ADD CONSTRAINT "exporter_quote_exporter_organization_id_fkey" FOREIGN KEY ("exporter_organization_id") REFERENCES "organization"("organization_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "landed_cost_estimate" ADD CONSTRAINT "landed_cost_estimate_import_operation_id_fkey" FOREIGN KEY ("import_operation_id") REFERENCES "import_operation"("import_operation_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "broker_proposal" ADD CONSTRAINT "broker_proposal_import_operation_id_fkey" FOREIGN KEY ("import_operation_id") REFERENCES "import_operation"("import_operation_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "broker_proposal" ADD CONSTRAINT "broker_proposal_broker_organization_id_fkey" FOREIGN KEY ("broker_organization_id") REFERENCES "organization"("organization_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "audit" ADD CONSTRAINT "audit_requester_id_fkey" FOREIGN KEY ("requester_id") REFERENCES "user"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "audit" ADD CONSTRAINT "audit_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organization"("organization_id") ON DELETE SET NULL ON UPDATE CASCADE;
